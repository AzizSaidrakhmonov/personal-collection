import React, { useState, useEffect } from 'react'
import './topCollections.scss'
import axios from 'axios'
import TopCollectionImg from '../../images/top-collection-img.jpg'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const TopCollections = () => {
  const [select, setSelect] = useState('Select All')

  const [topCollections, setTopCollections] = useState([])

  const getTopCollections = () => {
    axios
      .get('http://10.10.1.138:8080/api/collection/get_main_page')
      .then((res) => {
        setTopCollections(res.data.topCollections)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getTopCollections()
  }, [])

  return (
    <div className="collections">
      <div className="top-collections">
        <div className="top-collection">
          <img
            className="top-collection__img"
            src={TopCollectionImg}
            alt="collection-img"
          />
          <div className="name">Book</div>
          <div className="topic">Topic</div>
          <div className="description">Description</div>
        </div>
        <div className="top-collection">
          <img
            className="top-collection__img"
            src={TopCollectionImg}
            alt="collection-img"
          />
          <div className="name">Book</div>
          <div className="topic">Topic</div>
          <div className="description">Description</div>
        </div>
        <div className="top-collection">
          <img
            className="top-collection__img"
            src={TopCollectionImg}
            alt="collection-img"
          />
          <div className="name">Book</div>
          <div className="topic">Topic</div>
          <div className="description">Description</div>
        </div>
        <div className="top-collection">
          <img
            className="top-collection__img"
            src={TopCollectionImg}
            alt="collection-img"
          />
          <div className="name">Book</div>
          <div className="topic">Topic</div>
          <div className="description">Description</div>
        </div>
        <div className="top-collection">
          <img
            className="top-collection__img"
            src={TopCollectionImg}
            alt="collection-img"
          />
          <div className="name">Book</div>
          <div className="topic">Topic</div>
          <div className="description">Description</div>
        </div>
      </div>
      <div className="top-items">
        <table className="table">
          <thead>
            <tr>
              <th>
                <button></button>
              </th>
              <th>№</th>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <input type='checkbox'  />
                </div>
              </td>
              <td>1</td>
              <td>1</td>
              <td>Lamborghini</td>
              <td>
                <btn>Delete</btn>
                <btn>Edit</btn>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <input type='checkbox' />
                </div>
              </td>
              <td>1</td>
              <td>1</td>
              <td>Lamborghini</td>
              <td>
                <btn>Delete</btn>
                <btn>Edit</btn>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <input type='checkbox'  />
                </div>
              </td>
              <td>1</td>
              <td>1</td>
              <td>Lamborghini</td>
              <td>
                <btn>Delete</btn>
                <btn>Edit</btn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopCollections
