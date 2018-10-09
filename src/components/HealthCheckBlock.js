import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HealthCheckBlock.css';

class HealthCheckBlock extends Component {
    notify = (lastResponse) => {
       toast.success("The last response payload from the health endpoint is: " + lastResponse);
    }

    render() {
        const healthColor = {
            green: 'green',
            red: 'red',
            grey: 'grey'
        }

        let healthCheckStyle = this.props.data.status === 'UP' ? healthColor.green :
                          this.props.data.status === 'DOWN' ? healthColor.red :
                          healthColor.grey;
        healthCheckStyle += ' blockStyle';
        return (
            <div className={healthCheckStyle} onClick={() => this.notify(this.props.data.lastServerData)}>
                <ToastContainer />
                <div>
                    <strong>Url:</strong> {this.props.data.url}
                </div>
                <div>
                    <strong>Status:</strong> {this.props.data.status}
                </div>
            </div>
        );
    }
}

export default HealthCheckBlock;