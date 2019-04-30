import React from 'react'
import { useAlert } from 'react-alert'
import {Button} from 'reactstrap'
 
const AlertButton = (props) => {
  const alert = useAlert()
  const {onClick,children} = props
  return (
    <Button
      onClick={() => {
          onClick((text)=>{
            alert.show(text)
          })
          
          
      }}
    >
      {children}
    </Button>
  )
}
 
export default AlertButton