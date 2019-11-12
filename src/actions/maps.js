import { 
  MAP_STYLE_UPDATE, 
} from '../reducers/maps'

export const updateStyle = ( { data={} } ) => ({
  type: MAP_STYLE_UPDATE,
  style: data
})
