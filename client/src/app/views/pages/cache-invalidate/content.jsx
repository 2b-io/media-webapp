import React from 'react'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { listToString } from 'services/string-to-list'
import { Card, List, PlainButton, StatusIndicator, ResponsiveGrid } from 'ui/elements'
import { CopyIcon } from 'ui/icons'
import { DescriptionTextLine, Heading, TextLine } from 'ui/typo'
import _CacheInvalidForm from './form'

const BREAK_POINTS = {
  phone: 1,
  tablet: 2
}

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Wrapper = styled.div`
  padding: 8px;
`

const CacheInvalidForm = reduxForm({
  form: 'cacheinvalidator',
  enableReinitialize: true
})(_CacheInvalidForm)

const CacheInvalidate = ({
  invalidateCache,
  identifier,
  listInvalidateCaches,
  copyPatternsInvalidateCache,
  ui: {
    idle,
    patterns
  }
}) => {
  const items = Object.values(listInvalidateCaches).map(
    ({ identifier, patterns, status }) => ({
      key: identifier,
      content: () => <TextLine>
        { identifier } <br />
        { patterns.length && patterns.map((pattern, index) => (
          <DescriptionTextLine key={ index }>
            - { pattern }<br />
          </DescriptionTextLine>
        )) || (<DescriptionTextLine>&nbsp;&nbsp;N/A<br /></DescriptionTextLine>)
        }
      </TextLine>,
      trailing: () => (
        <PlainButton>
          <CopyIcon onClick={ () => copyPatternsInvalidateCache(patterns) } />
        </PlainButton>
      ),
      leading: () => <StatusIndicator isActive={ status === 'COMPLETED' ? true : false } />
    })
  )
  return (
    <Layout>
      <ResponsiveGrid
        breakpoints={ BREAK_POINTS }
        items={ [
          {
            content: () => (
              <Card
                content={ () => (
                  <Wrapper>
                    <CacheInvalidForm
                      idle={ idle }
                      initialValues={ { patterns: listToString(patterns) } }
                      onSubmit={ ({ patterns }) => invalidateCache(identifier, patterns) }
                    />
                  </Wrapper>
                ) }
              />
            )
          },
          {
            content: () => (
              <Card
                title={ () => <Heading mostLeft mostRight>Invalidations</Heading> }
                content={ () => (
                  <Wrapper>
                    <List items={ items } />
                  </Wrapper>
                ) }
              />
            )
          }
        ] }
      />
    </Layout>
  )
}
export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      listInvalidateCaches: selectors.listInvalidateCaches(state),
      identifier
    }
  },
  mapDispatch({
    invalidateCache: actions.invalidateCache,
    copyPatternsInvalidateCache: actions.copyPatternsInvalidateCache
  })
)(CacheInvalidate)
