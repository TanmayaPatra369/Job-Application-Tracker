/*
  # Clear all application data
  
  This migration safely removes all data from the application tables while preserving the table structure and policies.
  
  1. Data Removal
    - Removes all records from the jobs table
    - Removes all records from the profiles table
    
  2. Notes
    - Table structures are preserved
    - RLS policies remain intact
    - Foreign key relationships are respected
*/

-- Clear jobs table
TRUNCATE TABLE jobs CASCADE;

-- Clear profiles table (except for currently authenticated user)
DELETE FROM profiles 
WHERE id != auth.uid();