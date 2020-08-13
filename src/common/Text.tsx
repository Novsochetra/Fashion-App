import React, { ReactNode, ReactElement } from 'react'
import { Text as DefaultText, TextProps } from 'react-native'
type CustomTextProps = {
  children: ReactNode
}
export const Text = (props: TextProps & CustomTextProps): ReactElement => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <DefaultText {...props} style={[props.style, { fontFamily: 'JosefinSans' }]}>
      {props.children}
    </DefaultText>
  )
}
