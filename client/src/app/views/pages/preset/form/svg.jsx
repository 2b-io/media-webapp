import React, { Fragment } from 'react'

import { Break } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { CheckBox } from 'views/common/form'

const SvgParameterForm = () => (
  <Fragment>
    <CheckBox
      name="inlineStyles"
      label="Inline Styles"
    />
    <DescriptionText mostLeft mostRight>
      Move and merge styles from  &lt;style&gt; elements to element style attributes
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeDoctype"
      label="Remove Doctype"
    />
    <DescriptionText mostLeft mostRight>
      Remove doctype declaration
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeXMLProcInst"
      label="RemoveXML ProcInst"
    />
    <DescriptionText mostLeft mostRight>
      Remove XML processing instructions
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeComments"
      label="Remove Comments"
    />
    <DescriptionText mostLeft mostRight>
      Remove comments
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeEmptyAttrs"
      label="Remove Empty Attrs"
    />
    <DescriptionText mostLeft mostRight>
      Remove empty attributes
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeHiddenElems"
      label="Remove Hidden Elements"
    />
    <DescriptionText mostLeft mostRight>
      Remove hidden elements
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeEmptyText"
      label="Remove Empty Text"
    />
    <DescriptionText mostLeft mostRight>
      Remove empty Text elements
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeEmptyContainers"
      label="Remove Empty Containers"
    />
    <DescriptionText mostLeft mostRight>
      Remove empty Container elements
    </DescriptionText>
    <Break />
    <CheckBox
      name="minifyStyles"
      label="Minify Styles"
    />
    <DescriptionText mostLeft mostRight>
      Minify &lt;style&gt; elements content with CSSO
    </DescriptionText>
    <Break />
    <CheckBox
      name="convertColors"
      label="Convert Colors"
    />
    <DescriptionText mostLeft mostRight>
      Convert colors (from rgb() to #rrggbb, from #rrggbb to #rgb)
    </DescriptionText>
    <Break />
    <CheckBox
      name="convertPathData"
      label="Convert Path Data"
    />
    <DescriptionText mostLeft mostRight>
      Convert Path data to relative or absolute (whichever is shorter), convert one segment to another, trim useless delimiters, smart rounding, and much more
    </DescriptionText>
    <Break />
    <CheckBox
      name="convertTransform"
      label="Convert Transform"
    />
    <DescriptionText mostLeft mostRight>
      Collapse multiple transforms into one, convert matrices to the short aliases, and much more
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeUnknownsAndDefaults"
      label="Remove Unknowns And Defaults"
    />
    <DescriptionText mostLeft mostRight>
      Remove unknown elements content and attributes, remove attrs with default values
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeUselessStrokeAndFill"
      label="Remove Useless Stroke And Fill"
    />
    <DescriptionText mostLeft mostRight>
      Remove useless stroke and fill attrs
    </DescriptionText>
    <Break />
    <CheckBox
      name="cleanupNumericValues"
      label="Cleanup Numeric Values"
    />
    <DescriptionText mostLeft mostRight>
      Round numeric values to the fixed precision, remove default px units
    </DescriptionText>
    <Break />
    <CheckBox
      name="collapseGroups"
      label="Collapse Groups"
    />
    <DescriptionText mostLeft mostRight>
      Collapse useless groups
    </DescriptionText>
    <Break />
    <CheckBox
      name="mergePaths"
      label="Merge Paths"
    />
    <DescriptionText mostLeft mostRight>
      Merge multiple Paths into one
    </DescriptionText>
    <Break />
    <CheckBox
      name="cleanupIDs"
      label="Clean Up IDs"
    />
    <DescriptionText mostLeft mostRight>
      Remove unused and minify used IDs
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeStyleElement"
      label="Remove Style Element"
    />
    <DescriptionText mostLeft mostRight>
      Remove &lt;style&gt; elements (disabled by default)
    </DescriptionText>
    <Break />
    <CheckBox
      name="removeNonInheritableGroupAttrs"
      label="Remove Non Inheritable GroupAttrs"
    />
    <DescriptionText mostLeft mostRight>
      remove non-inheritable group&apos;s &quot;presentation&quot; attributes
    </DescriptionText>
  </Fragment>
)

export default SvgParameterForm
