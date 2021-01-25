import React, { Component } from 'react';
import { Switch, Route } from  'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

import {seedColors} from './seedColors';
import { generatePalette } from './utilities/colorHelpers';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { palettes: window.localStorage.getItem('palettes') ? JSON.parse(window.localStorage.getItem('palettes')) : seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.restoreDefaultPalettes = this.restoreDefaultPalettes.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    });
  }

  // makeSingleColorPalette(paletteId, colorId) {
  //   // find palette
  //   const palette = this.findPalette(paletteId);
  //   // console.log(palette.colors);

  //   // lowercase all color names so that they can be searched for a match using url w/o capitals
  //   const paletteColorsMod = palette.colors.map(colorObj => {
  //     let rcolorObj = {};
  //     rcolorObj.name = colorObj.name.toUpperCase();
  //     rcolorObj.color = colorObj.color;
  //     return rcolorObj;
  //   });
  //   // console.log(paletteColorsMod);

  //   // find single color in new lowercased array
  //   const color = paletteColorsMod.find(({ name }) => name === colorId.toUpperCase());
  //   console.log(color);
    
  //   // generate 10 shades using colorHelpers.js
  //   const scale = getScale(color.color, 10).reverse();
  //   console.log(levels, scale);

  //   // create an array of shade colors with name? check color helpers.js
  // }

  savePalette(newPalette) {
    // add to initial seedColors that are stored in state 
    this.setState(st => ({
      palettes: [...st.palettes, newPalette]
    }), this.syncLocalStorage);
  } 

  syncLocalStorage() {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }

  handleDelete(id){
      this.setState(st => ({
        palettes: st.palettes.filter(palette => palette.id !== id)
      }), this.syncLocalStorage);
  }

  restoreDefaultPalettes() {
    this.setState({palettes: seedColors});
  }

  render() {
  return (
    // each route has a unique location key
    <Route render={({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={500}>
          <Switch location={location}>
            {/* order matters. it should be above route for palette */}
            <Route
              exact
              path="/palette/new"
              render={(routeProps) => (
                <Page>
                  <NewPaletteForm 
                    savePalette={this.savePalette}
                    palettes={this.state.palettes}
                    {...routeProps} 
                  />
                </Page>
              )}
            />
            <Route exact path="/" 
              render={(routeProps) => (
                <Page>
                  <PaletteList 
                    palettes={this.state.palettes} 
                    handleDelete={this.handleDelete} 
                    restoreDefaultPalettes={this.restoreDefaultPalettes}
                    {...routeProps} 
                  />
                </Page>
              )} 
            />
            <Route
              exact
              path="/palette/:id"
              render={routeProps => (
                <Page>
                  <Palette 
                    palette={generatePalette(this.findPalette(routeProps.match.params.id))} 
                  />
                </Page>
              )}
            />
            {/* filter seed colors for particular palette and color then generate palette */}
            <Route
              exact
              path="/palette/:paletteId/:colorId"
              render={routeProps => (
                <Page>
                  <SingleColorPalette 
                    colorId={routeProps.match.params.colorId} 
                    palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
                    {...routeProps} 
                  />
                </Page>
              )}
            />
            {/* redirect to home page if unknown route ... acts like an 'else' */}
            <Route
              render={routeProps => (
                <Page>
                  <PaletteList
                    palettes={this.state.palettes}
                    handleDelete={this.handleDelete}
                    restoreDefaultPalettes={this.restoreDefaultPalettes}
                    {...routeProps}
                  />
                </Page>
              )}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )} />
    
  );
  }
}

export default App;
