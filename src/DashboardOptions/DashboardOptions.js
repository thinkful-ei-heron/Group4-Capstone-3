import React from "react";

export default class DashboardOptions extends React.Component {
  render() {
    return (
      <>
        <section className='dashboard-options-component'>
          <span className="radio-group">
            <input type="radio" value="small-icons" id="small-icons" class="hidden"/>
            <label for="small-icons">small-icons</label>
            <input type="radio" value="large-icons" id="large-icons" class="hidden"/>
            <label for="large-icons">large-icons</label>
            <input type="radio" value="tiles" id="tiles" class="hidden"/>
            <label for="tiles">tiles</label>
            <input type="radio" value="list" id="list" class="hidden"/>
            <label for="list">list</label>
            <input type="radio" value="details" id="details" class="hidden"/>
            <label for="details">details</label>
          </span>
          <select className='sort-select' onChange={this.sortSelect}>
            <option value='none'>Sort By</option>
            <option value='Youngest'>Youngest</option>
            <option value='Oldest'>Oldest</option>
            <option value='Rating ASC'>Rating ASC</option>
            <option value='Rating DESC'>Rating DESC</option>
            <option value='Heaviness ASC'>Heaviness ASC</option>
            <option value='Heaviness DESC'>Heaviness DESC</option>
          </select>
          <select className='filter-select' onChange={this.filterType}>
            <option value='Ale'>Ale</option>
            <option value='Altbier'>Altbier</option>
            <option value='American Lager'>American Lager</option>
            <option value='Barley Wine'>Barley Wine</option>
            <option value='Belgian'>Belgian</option>
            <option value='Berliner Weisse'>Berliner Weisse</option>
            <option value='Bitter'>Bitter</option>
            <option value='Bock'>Bock</option>
            <option value='Brown Ale'>Brown Ale</option>
            <option value='Cider'>Cider</option>
            <option value='Cream Ale'>Cream Ale</option>
            <option value='Doppelbock'>Doppelbock</option>
            <option value='Dunkel'>Dunkel</option>
            <option value='Flanders Red Ale'>Flanders Red Ale</option>
            <option value='German Pilser'>German Pilser</option>
            <option value='Gose'>Gose</option>
            <option value='Helles'>Helles</option>
            <option value='Helles Bock'>Helles Bock</option>
            <option value='Honey'>Honey</option>
            <option value='Imperial IPA'>Imperial IPA</option>
            <option value='IPA'>IPA</option>
            <option value='Irish Red Ale'>Irish Red Ale</option>
            <option value='Kolsch'>Kolsch</option>
            <option value='Lager'>Lager</option>
            <option value='Lambic'>Lambic</option>
            <option value='Mild ale'>Mild ale</option>
            <option value='Old Ale'>Old Ale</option>
            <option value='Pale Ale'>Pale Ale</option>
            <option value='Pale Lager'>Pale Lager</option>
            <option value='Pilsner'>Pilsner</option>
            <option value='Porter'>Porter</option>
            <option value='Quadrupel'>Quadrupel</option>
            <option value='Rye'>Rye</option>
            <option value='Saison'>Saison</option>
            <option value='Schwarzbier'>Schwarzbier</option>
            <option value='Scotch Ale'>Scotch Ale</option>
            <option value='Seasonal Beer'>Seasonal Beer</option>
            <option value='Stout'>Stout</option>
            <option value='Vienna lager'>Vienna lager</option>
            <option value='Wittbier'>Wittbier</option>
            <option value='Other'>Other</option>
          </select>
          <input type='text' placeholder='Search by name...' onChange={this.handleSearch}/>
        </section>
      </>
    )
  }
}