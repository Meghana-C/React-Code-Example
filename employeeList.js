import React, { Component } from 'react';
import { commonApi } from '../actions';
import { connect } from 'react-redux';

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = { employeeList: "" }
    }

    async componentDidMount() {
        try {

            const response = await this.props.commonApi('user', '', 'get', 'EMPLOYEE-LIST');
            console.log(response)
            if (response.status === 200) {
                this.setState({ employeeList: response.data });
            }
        }
        catch (err) {
            throw (err);
        }
    }
    render() {
        let { employeeList } = this.state;
        return (
            <div className="row">
                <div className="col-md-4 emp-table">
                <h2 className='pb-2 text-center'>
                Employee List
                         </h2>
                    <table className="table table-bordered"><thead><tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Email Id</th>
                                <th>Phone No.</th>
                            </tr></thead>{
                            employeeList && Array.isArray(employeeList) && employeeList.map((employee, key) => {
                                return (
                                    <tbody key={employee.id}><tr>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.age}</td>
                                        <td>{employee.gender}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phoneNo}</td></tr>
                                </tbody>)})}
                    </table>
                </div>
            </div>
        );

    }
}

export default connect(null, { commonApi })(EmployeeList);