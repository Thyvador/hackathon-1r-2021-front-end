import { Collapse } from "@material-ui/core";

import { useState } from 'react'

const ProductDetail = ({product}) => {

  const [detailsOpened, setDetailsOpened] = useState(false);
  const onCollapse = () => {
    setDetailsOpened(!detailsOpened);
  };


  return <Collapse in={detailsOpened} timeout="auto" unmountOnExit>

</Collapse>

}

export default ProductDetail;