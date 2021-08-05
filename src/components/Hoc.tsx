import { useEffect, useState } from 'react';
import axios from 'axios';

const withHOC = (param) => (WrappedComponent) => {
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
  return Component
}
export default withHOC;