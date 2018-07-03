import React from 'react'
import styled from 'styled-components'

const userInfo = () => (
  <div>
    <div>
      <Layout>
        <span>User name</span>
        <input
          disabled={ true }
          defaultValue={ 'cuongtv' }
        />
      </Layout>
      <Layout>
        <span>Email</span>
        <input
          disabled={ true }
          defaultValue={ 'truongcuong@gmail.com' }
        />
      </Layout>
    </div>
  </div>
)

export default userInfo

const Layout = styled.div`
  &{
    display: grid;
    grid-template-columns: 20% auto auto auto auto;
    padding: 10px 10px 10px 10px;
  }
  @media (max-width: 750px) {
    grid-template-columns: auto;
  }
`
