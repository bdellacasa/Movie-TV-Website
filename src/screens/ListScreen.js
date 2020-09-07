import React, { useState, useEffect } from 'react';
import { CONTENT_TYPE } from '../Constants';
import '../styles/PaginatorStyles.css';
import '../styles/ListStyles.css';
import Search from '../components/Search';
import ClientService from '../services/ClientService';
import Screen from '../screens/Screen';
import List from '../components/List';
import Paginator from '../components/Paginator';

const ListScreen = (props) => {
  const [type, setType] = useState(undefined);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!data.length && totalPages === 0) {
      getContent(1);
    }
  }, [data, props.location])

  const updateContent = (type, result) => {
    if (result) {
      setType(type);
      setTotalPages(result.total_pages);
      setData(result.results);
    } else {
      setType(type);
      setTotalPages(0);
      setData([]);
    }
  }

  const searchItem = async (query, page) => {
    const result = await ClientService.searchItem(query, page);
    return result;
  }

  const getContent = async (page) => {
    let result;
    const path = props.location.pathname.split("/");
    const type = path[1] === CONTENT_TYPE.SEARCH ? path[1] : path[2];
    switch (type) {
      case CONTENT_TYPE.MOVIES:
        result = await ClientService.getMoviePopular(page);
        break;
      case CONTENT_TYPE.TV:
        result = await ClientService.getTVPopular(page);
        break;
      case CONTENT_TYPE.PERSON:
        result = await ClientService.getPopularPeople(page);
        break;
      case CONTENT_TYPE.SEARCH:
        result = await searchItem(path[3], page);
        break;
      default:
        break;
    }
    updateContent(type, result, page);
  }

  const renderContent = () => {
    return (
      <div style={{ alignContent: 'center' }}>
        {type === CONTENT_TYPE.SEARCH &&
          <div className={"list-search-container"}>
            <Search />
          </div>}
        {data && <List data={data} type={type} />}
        {data && data.length > 0 && <Paginator totalPages={totalPages} maxPagesToShow={20} paginate={page => getContent(page)} />}
      </div>
    )
  }

  return (
    <Screen
      content={
        renderContent()
      }
    />
  );
}

export default ListScreen;