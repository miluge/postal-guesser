import { supabase } from '../../lib/supabaseClient.js'

export default {
  async getPostalCodes() {
    const { data, error } = await supabase
      .from('postal_codes')
      .select('*, locations(*)')
      .order('code')
    
    if (error) throw error
    return data
  },
  
  async getPostalCodesByLocation(locationId) {
    const { data, error } = await supabase
      .from('postal_codes')
      .select('*')
      .eq('location_id', locationId)
      .order('code')
    
    if (error) throw error
    return data
  },
  
  async getPostalCode(code) {
    const { data, error } = await supabase
      .from('postal_codes')
      .select('*, locations(*)')
      .eq('code', code)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },
  
  async createPostalCode(postalCode) {
    const { data, error } = await supabase
      .from('postal_codes')
      .insert([postalCode])
      .select()
    
    if (error) throw error
    return data[0]
  },
  
  async updatePostalCode(id, postalCode) {
    const { data, error } = await supabase
      .from('postal_codes')
      .update(postalCode)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },
  
  async deletePostalCode(id) {
    const { error } = await supabase
      .from('postal_codes')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}