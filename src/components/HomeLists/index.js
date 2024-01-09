import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

/* const apiStatusConstant = {
  initial: 'Initial',
  inprogress: 'In_progress',
  success: 'success',
  failure: 'failure',
} */

class HomeLists extends Component {
  state = {
    isLoader: true,
    listData1: [],
    listData2: [],
  }

  componentDidMount() {
    this.getListData()
  }

  getListData = async () => {
    const listUrl = 'https://apis.ccbp.in/list-creation/lists'
    const response = await fetch(listUrl)
    const listData = await response.json()
    console.log(listData.lists)
    const filteredList1 = listData.lists.filter(
      eachList => eachList.list_number === 1,
    )
    const filteredList2 = listData.lists.filter(
      eachList => eachList.list_number === 2,
    )

    if (listData === undefined) {
      this.setState({isLoader: false})
    }
    if (listData === undefined) {
      this.renderFailureView()
    } else {
      this.setState({
        listData1: filteredList1,
        listData2: filteredList2,
        isLoader: false,
      })
    }
    // console.log(filteredList1)
    // console.log(filteredList2)
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/list-creation/list-creation-failure-img.png"
        alt="failure view"
        className="failure-image"
      />
    </div>
  )

  renderListHomeContainer = () => {
    const {listData1, listData2} = this.state
    console.log(listData1)
    console.log(listData2)
    return (
      <>
        <div className="title-container">
          <h1 className="title">List Creation</h1>
          <button type="button" className="list-button">
            Create a new List
          </button>
        </div>
        <div className="lists-container">
          <div className="list1-container">
            <input
              type="checkbox"
              placeholder="list 1"
              className="input-container"
            />
          </div>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#3b82f6" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoader} = this.state
    return (
      <div className="app-container">
        {isLoader ? this.renderLoader() : this.renderListHomeContainer()}
      </div>
    )
  }
}
export default HomeLists
