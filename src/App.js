import React, { Component } from 'react';
import HealthCheckBlock from './components/HealthCheckBlock'
import request from 'request';
import bowser  from 'bowser';

const browser = bowser.getParser(window.navigator.userAgent);
const browserVersion = browser.getBrowser().version;

class App extends Component {
    state = {
      listOfEndPoints: [
      'https://cognition.dev.stackworx.cloud/api/status',
      'https://ord.dev.stackworx.io/health',
      'https://api.durf.dev.stackworx.io/health',
      'https://prima.run/health',
      'https://stackworx.io/',
      'https://stackworx.io/'
      ],
      block: Array(6).fill({
        url: null,
        status: null,
        lastServerData: null
      }),
      endPointData: Array(6).fill(null)
    }

  healthCheckStatus = (url, index) => {
    request({ uri: url, method: 'GET' },  (error, response, body) => {
      let status = null;
      if (error)
          status = 'OTHER';
      else if ( response.statusCode === 200)
          status = 'UP';
      else
          status = 'DOWN';
      this.setState(healthCheckState => {
        const blockData = [...healthCheckState.block];
        const urlData = [...healthCheckState.endPointData];
        const data = {
          url,
          status,
          lastServerData: blockData[index].status
        };
        blockData[index] = data;
        urlData[index] = status;
        return {
          block: blockData,
          urlData
        }
      });
    });
  }

  serverHealthCheck = (endPoints) => {
    endPoints.map((url, index) => {
      return this.healthCheckStatus(url, index);
    });
  }

  componentDidMount() {
    if (browser.getBrowserName() === 'Chrome' && browserVersion) {
      setInterval(() => {
        return this.serverHealthCheck(this.state.listOfEndPoints);
      }, 5000)
    }
  }

  render() {
    const processData = (browser.getBrowserName() !== 'Chrome' && browserVersion) ?
    <div>browser Not Supported</div> :
    <div className='container'>
        { this.state.block.map((data, index) => {
            return <HealthCheckBlock key={index} data={data}/>
          }
        )}
      </div>
    return (
      processData
    );
  }
}

export default App;
