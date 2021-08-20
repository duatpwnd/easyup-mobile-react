import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

const withHOC = (param) => (WrappedComponent) => {
  console.log('HOC========================================');
  const Component = props => {
    const [data, dataSet] = useState<{ [key: string]: any }>({})
    useEffect(() => {
      axios.post("", JSON.stringify(param)).then((result) => {
        console.log('HOC-Axios:', result);
        dataSet(result.data.data);
      })
    }, [])
    return <WrappedComponent data={data} />

  }
  return React.memo(Component, (prev, next) => {
    console.log(prev, next);
    return true;
  })
}
export default withHOC;