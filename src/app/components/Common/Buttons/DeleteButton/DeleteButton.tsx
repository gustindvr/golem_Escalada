import { Button } from 'antd'
import React from 'react'

type Props = {
  action: () => void,
}

export const DeleteButton = ({ action }: Props) => {
  return (
    <Button color="danger" variant="filled" onClick={action}>
      X
    </Button>
  )
}