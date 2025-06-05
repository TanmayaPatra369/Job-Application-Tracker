/*
  # Add RLS policies for jobs table

  1. Changes
    - Enable RLS on jobs table
    - Add policies for CRUD operations on jobs table
    - Add user_id column to jobs table to link jobs with users
    
  2. Security
    - Enable row level security
    - Add policies to ensure users can only:
      - Read their own jobs
      - Insert jobs with their user_id
      - Update their own jobs
      - Delete their own jobs
*/

-- Add user_id column if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'jobs' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE jobs ADD COLUMN user_id UUID REFERENCES auth.users(id);
    
    -- Set user_id to the creator's ID for existing rows
    UPDATE jobs SET user_id = auth.uid() WHERE user_id IS NULL;
    
    -- Make user_id required for future inserts
    ALTER TABLE jobs ALTER COLUMN user_id SET NOT NULL;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own jobs
CREATE POLICY "Users can read own jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own jobs
CREATE POLICY "Users can insert own jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own jobs
CREATE POLICY "Users can update own jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own jobs
CREATE POLICY "Users can delete own jobs"
  ON jobs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);