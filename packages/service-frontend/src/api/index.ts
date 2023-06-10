function testQuery(): Promise<{status: 'success'}> {
  console.log('test in next')
  return Promise.resolve({ status: 'success' })
}

export default testQuery;