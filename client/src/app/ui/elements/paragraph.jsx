import styled from 'styled-components'

const Paragraph = styled.p`
  line-height: 1.5em;
  padding: ${ ({ theme: { spacing } }) => `${ spacing.small } 0 ${ spacing.medium }` };
`

export default Paragraph
