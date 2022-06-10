import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.svg'
import './App.css'
import { Container, Row, Col, Form, Table } from 'react-bootstrap';

function App() {
  interface Items {
    edit: boolean,
    item: string,
    edit_item: string
  }
  const [item, setItem] = useState<string>("")
  const [itemList, setItemList] = useState<Items[]>(JSON.parse(sessionStorage.getItem('items')!) || [])
  useEffect(() => {
    sessionStorage.setItem("items", JSON.stringify(itemList));
  }, [itemList]);
  function itemName (e: { target: { value: string; }; }) {
    setItem(e.target.value)
  }
  function newItemName (e: { target: { value: string; }; }, index: number) {
    itemList[index]["edit_item"] = e.target.value
    setItemList(Array.from(itemList))
  }
  function addItem (event: { keyCode: number; }) {
    let repeat: boolean = false
    if (event.keyCode == 13 && item != "") {
      itemList.forEach(element => {
        if (repeat) {
          return false;
        } else{
          if (element.item === item) repeat = true
        }
      });
      if (repeat) {
        alert('This list already has the same name.')
      } else {
        setItemList((prevNames) => [...prevNames, { edit: false, item: item, edit_item: item }] )
      }
      setItem("")
    }
  }
  function deleteItem (index: number) {
    if (confirm('Make sure you want to delete？')) {
      itemList.splice(index,1)
      setItemList(Array.from(itemList))
    }
  }
  function editItem (index: number) {
    itemList[index]["edit"] = true
    setItemList(Array.from(itemList))
  }
  function saveItem (index: number) {
    itemList[index] = { edit: false, item: itemList[index]["edit_item"], edit_item: itemList[index]["edit_item"] }
    setItemList(Array.from(itemList))
  }
  function cancelItem (index: number) {
    itemList[index] = { edit: false, item: itemList[index]["item"], edit_item: itemList[index]["item"] }
    setItemList(Array.from(itemList))
  }
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <div className='d-flex align-items-center justify-content-center mt-2 mb-2'>
              <img src={logo} className="App-logo" alt="logo" />
              <h3 className='m-0'>React Todo List</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control type="text" placeholder="Press Enter to add an item" value={item} onChange={itemName} onKeyUp={addItem}/>
          </Col>
        </Row>
        <Table className='mt-2' responsive>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: itemList.length }).map((_, index) => (
              <tr key={index}>
                <td>{ !(itemList[index]["edit"]) ? 
                      itemList[index]["item"] :
                      <Form.Control type="text" placeholder="Item Name" value={itemList[index]["edit_item"]} onChange={(e) => newItemName(e, index)}/>
                    }
                </td>
                <td>
                  { (itemList[index]["edit"]) ? 
                    <div>
                      <FontAwesomeIcon className='check' icon={faCheck} onClick={() => saveItem(index)}/>
                      <FontAwesomeIcon className='times' icon={faTimes} onClick={() => cancelItem(index)}/>
                    </div>
                    : 
                    <div>
                      <FontAwesomeIcon className='edit' icon={faPenToSquare} onClick={() => editItem(index)}/>
                      <FontAwesomeIcon className='trash' icon={faTrash} onClick={() => deleteItem(index)}/>
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default App
