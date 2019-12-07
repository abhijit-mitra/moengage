import React, { PureComponent } from 'react';
import {Input, Button, TableHeader, Row, TableFooter} from './Components/atoms/';
import {table_data} from './data';

import './App.css';

const row_config=['_id','name','type','company'];

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query:'',
      data:table_data,
      page_no:0,
    };
  }
  handleSearch = (e)=>{
    const {value} = e.target;
    const {data} = this.state;
    const new_data = table_data.filter((elm)=>(elm['name'].includes(value.toUpperCase())));
    this.setState({query:value, data:new_data, page_no:0});
  }
  handleNext = ()=>{
    this.setState((prevState)=>({
      ...prevState,
      page_no: prevState.page_no+1,
    }))
  }
  handlePrev = ()=>{
    this.setState((prevState)=>({
      ...prevState,
      page_no: prevState.page_no-1,
    }))
  }
  render() {
    const {query, data, page_no} = this.state;
    const max_page_no = Math.ceil(data.length/10);
    return (
      <div className='app p-30'>
        <div className="border p-30">
          <Input value={query} onChange={this.handleSearch} placeholder={'Search by name...'}/>
          <TableHeader data={['id','name','type','company']}/>
          {
            data.slice((page_no*10), (page_no*10)+10).map((elm)=>(
              <Row key={elm['id']} obj={elm} config_arr={row_config}/>
            ))
          }
          <TableFooter>
              <div className="col-md-10"></div>
              <div className="col-md-1">
                  <Button label={'Prev'} onClick={this.handlePrev} disabled={page_no===0} />
              </div>
              <div className="col-md-1">
                  <Button label={'Next'} onClick={this.handleNext} disabled={page_no===max_page_no-1}/>
              </div>
          </TableFooter>
        </div>
      </div>
    );
  }

}

export default App;
