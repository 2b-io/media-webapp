import React, { Fragment } from 'react'

import { Break } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { CheckBox } from 'views/common/form'

const SvgParameterForm = ({ idle }) => (
  <Fragment>
    <CheckBox
      disabled={ !idle }
      name="cleanupAttrs"
      label="Cleanup Attrs"
    />
    <DescriptionText mostLeft mostRight>
      Cleanup attributes from newlines, trailing, and repeating spaces
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="inlineStyles"
      label="Inline Styles"
    />
    <DescriptionText mostLeft mostRight>
      Move and merge styles from  &lt;style&gt; elements to element style attributes
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeDoctype"
      label="Remove Doctype"
    />
    <DescriptionText mostLeft mostRight>
      Remove doctype declaration
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeXMLProcInst"
      label="RemoveXML ProcInst"
    />
    <DescriptionText mostLeft mostRight>
      Remove XML processing instructions
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeComments"
      label="Remove Comments"
    />
    <DescriptionText mostLeft mostRight>
      Remove comments
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeEmptyAttrs"
      label="Remove Empty Attrs"
    />
    <DescriptionText mostLeft mostRight>
      Remove empty attributes
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeHiddenElems"
      label="Remove Hidden Elements"
    />
    <DescriptionText mostLeft mostRight>
      Remove hidden elements
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeEmptyText"
      label="Remove Empty Text"
    />
    <DescriptionText mostLeft mostRight>
      Remove empty Text elements
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeEmptyContainers"
      label="Remove Empty Containers"
    />
    <DescriptionText mostLeft mostRight>
      Remove empty Container elements
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="minifyStyles"
      label="Minify Styles"
    />
    <DescriptionText mostLeft mostRight>
      Minify &lt;style&gt; elements content with CSSO
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="convertColors"
      label="Convert Colors"
    />
    <DescriptionText mostLeft mostRight>
      Convert colors (from rgb() to #rrggbb, from #rrggbb to #rgb)
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="convertPathData"
      label="Convert Path Data"
    />
    <DescriptionText mostLeft mostRight>
      Convert Path data to relative or absolute (whichever is shorter), convert one segment to another, trim useless delimiters, smart rounding, and much more
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="convertTransform"
      label="Convert Transform"
    />
    <DescriptionText mostLeft mostRight>
      Collapse multiple transforms into one, convert matrices to the short aliases, and much more
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeUnknownsAndDefaults"
      label="Remove Unknowns And Defaults"
    />
    <DescriptionText mostLeft mostRight>
      Remove unknown elements content and attributes, remove attrs with default values
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeUselessStrokeAndFill"
      label="Remove Useless Stroke And Fill"
    />
    <DescriptionText mostLeft mostRight>
      Remove useless stroke and fill attrs
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="cleanupNumericValues"
      label="Cleanup Numeric Values"
    />
    <DescriptionText mostLeft mostRight>
      Round numeric values to the fixed precision, remove default px units
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="collapseGroups"
      label="Collapse Groups"
    />
    <DescriptionText mostLeft mostRight>
      Collapse useless groups
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="mergePaths"
      label="Merge Paths"
    />
    <DescriptionText mostLeft mostRight>
      Merge multiple Paths into one
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="cleanupIDs"
      label="Clean Up IDs"
    />
    <DescriptionText mostLeft mostRight>
      Remove unused and minify used IDs
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeStyleElement"
      label="Remove Style Element"
    />
    <DescriptionText mostLeft mostRight>
      Remove &lt;style&gt; elements (disabled by default)
    </DescriptionText>
    <Break />
    <CheckBox
      disabled={ !idle }
      name="removeNonInheritableGroupAttrs"
      label="Remove Non Inheritable GroupAttrs"
    />
    <DescriptionText mostLeft mostRight>
      remove non-inheritable group&apos;s &quot;presentation&quot; attributes
    </DescriptionText>
  </Fragment>
)

export default SvgParameterForm
