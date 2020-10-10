/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

// import { useHistory } from "react-router-dom";

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import { makeSelectProductList } from './selector';
import { makeSelectLoading, makeSelectError } from "containers/App/selectors";
import { fetchProductList, searchProduct } from './actions';
import reducer from './reducer';
import saga from './saga';

import './productList.css';

const logo = require('../../images/nykaa_logo.png');

const key = 'productList';

const ProductList = ({productLists, onFetchProductList, fetchMoreData, onSearchValue}) => {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    var searchInp = '';
    

    const [products, setproducts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [n, setN] = useState(12);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        console.log("productLists list here", productLists);
        if ((productLists && productLists.productList && productLists.productList.products !== false)) {
            setproducts(productLists.productList.products);
            setListItems(productLists.productList.products.slice(0,12))
        }
        else {
            onFetchProductList()
        }
    }, [productLists]);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    function handleScroll() {
        if (window.innerHeight  !== document.documentElement.offsetHeight) return;
            setIsFetching(true);
            console.log('Fetch more list items!');
    }

    function fetchMoreListItems() {
        setTimeout(() => {
            setListItems(products.slice(0, n+12));
            if (n+12 <= products.length){setN(n+12);}
            setIsFetching(false);
        }, 2000);
    }

    const checkScrollTop = () => {    
        if (!showScroll && window.pageYOffset > 400){
            setShowScroll(true)    
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false)    
        }  
    };
    window.addEventListener('scroll', checkScrollTop)

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const searchItem = (e) => {
        console.log("e.target.value", e.target.value);
        // console.log("e.key", e.key);
        searchInp = e.target.value;
        console.log("searchInp", searchInp);
    }

    const keyDownEvent = (e) => {
        if (e.key === 'Enter') {
            finalResult()
        }
        // console.log("e.key", e.key);
    }

    const finalResult = () => {
        console.log("finalResult", searchInp);
        if (searchInp === '') {
            onFetchProductList()
        }
        else {
            onSearchValue(searchInp);
        }
    }

    // const routeChange = (route) => {
    //     const history = useHistory();
    //     let path = `/${route}`;
    //     history.push(path);
    // }

    var searchIcon = productLists.search === true ? <CloseIcon onClick={() => onFetchProductList()} /> : <SearchIcon onClick={() => finalResult()} />;

    const Head = () => {
        return(
            <React.Fragment>
                <div className="head_margin">
                    <img src={logo} className={isBrowser === true ? "head_logo": "head_logo_mobile"} />
                </div>
            </React.Fragment>
        )
    }

    const SearchBar = () => {
        return (
            <div className="search_div">
                <TextField
                label="Search"
                variant="outlined"
                className={isBrowser === true ? "search_textbox" : "search_textbox_mobile"}
                onChange={(e) => searchItem(e)}
                onKeyDown={(e) => keyDownEvent(e)}
                style={{width: "80%"}}
                InputProps={{
                    endAdornment: searchIcon
                }}
                fullWidth
                />
            </div>
        )
    }

    const ListedProducts = () => {
        return (
            <React.Fragment>
                <Grid container className="product_list">
                    {
                        listItems && listItems.length > 0 ? listItems.map((item) => {
                            return (
                                <Grid xs={isBrowser === true ?  3 : 6} className="product_item">
                                    <Card className="product_card">
                                        <CardActionArea
                                            className="card_action"
                                            // onClick={e => routeChange(item.actionUrl)}
                                        >
                                            <CardContent>
                                                <img src={item.imageUrl} className="card_image" />
                                                <h4 className="product_title">
                                                    {item.title}
                                                </h4>
                                                <p className="product_description">
                                                    {item.subTitle}
                                                </p>
                                                <div className="product_size_div">
                                                {
                                                    item && item.sizeVariation && item.sizeVariation.length > 0 ? item.sizeVariation.map((size) => {
                                                        return (
                                                            <p className="product_sizes">
                                                                {size.title}
                                                            </p>
                                                        )
                                                    }) : null
                                                }
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        }) : "No products"
                    }
                    {isFetching && 'Fetching more list items...'}
                </Grid>
            </React.Fragment>
        )
    }

    const ScrollToTop = () => {
        return (
                <ArrowUpwardIcon 
                    className="scroll_top_btn"
                    onClick={scrollTop}
                    style={{color: "#000"}}
                />
        )
    }
    
    return (
        <React.Fragment>
            <Head />
            <SearchBar />
            <ListedProducts />
            <ScrollToTop />
        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
  productLists: makeSelectProductList()
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchProductList: evt => {
      console.log("product list fetch event called", evt);
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fetchProductList());
    },
    onSearchValue: evt =>{
      console.log("product list search event called", evt);
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(searchProduct(evt));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductList);

