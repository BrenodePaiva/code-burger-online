import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import paths from '../../../constants/paths'
import api from '../../../services/api'
import formatCurrency from '../../../utils/formatCurrency'
import { Container, DeleteIconStyles, EditIconStyles, Img } from './styles'
import { LoadScreen } from '../../../components'
import { toast } from 'react-toastify'

function ListProducts() {
  const [products, setProducts] = useState()
  const [load, setLoad] = useState(false)
  const { push } = useHistory()

  async function loadProducts() {
    const { data } = await api.get('products')

    setProducts(data)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  function isOffer(offerStatus) {
    if (offerStatus) {
      return <CheckCircleIcon style={{ color: '#228822' }} />
    }
    return <CancelIcon style={{ color: '#cc1717' }} />
  }

  function editProduct(product) {
    push({ pathname: paths.EditProduct, state: { product } })
  }

  async function deleteProduct(id) {
    try {
      setLoad(true)
      await toast.promise(api.delete(`products/${id}`), {
        pending: 'Excluindo produto...',
        success: 'Produto excluído com sucesso',
        error: 'Falha ao excluir o produto'
      })
      await loadProducts()
    } finally {
      setLoad(false)
    }
  }

  return (
    <Container>
      {load && <LoadScreen />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell align="center">Produto em Oferta</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map(product => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" width="256px">
                    {product.name}
                  </TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell align="center">{isOffer(product.offer)}</TableCell>
                  <TableCell>
                    <Img src={product.url} alt="produto-imagem" />
                  </TableCell>
                  <TableCell>
                    <EditIconStyles onClick={() => editProduct(product)} />
                    <DeleteIconStyles
                      onClick={() => deleteProduct(product.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ListProducts
