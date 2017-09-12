import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {styles} from './styles'
class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      searchText: null,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    console.log("--------make remote request--------");
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true,
        searchText: null,
      },
      () => {
        this.makeRemoteRequest();
        console.log("-----refresh-----")
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
        console.log("--------load more---------")
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar
              placeholder="Type Here..." lightTheme
              round
              onChangeText={(value) => this.setState({searchText: value}) }
             />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    let { searchText } = this.state;
    const search = new RegExp(searchText, 'i');
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
        <FlatList
          data={(!searchText)?this.state.data:this.state.data.filter(object => search.test(object.name.first + ' ' + object.name.last)) }
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={
                <View style={styles.titleView}>
                  <Text style={styles.titleText}> {item.name.first} {item.name.last} </Text>
                </View>
              }
              subtitle={
                <View style={styles.subtitleView}>
                  <Text style={styles.subtitleText}> {!item.id.value?"N/A":item.id.value} </Text>
                  <Text style={styles.subtitleText}> {item.email} </Text>
                </View>
              }
              avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={ !searchText ? this.handleLoadMore : null}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}

export default Customers;
