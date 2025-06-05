export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          user_id: string
          company: string
          position: string
          location: string | null
          job_type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'
          status: 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'accepted'
          deadline: string | null
          salary: number | null
          notes: string | null
          created_at: string
          updated_at: string
          tags: string[] | null
          priority: 'low' | 'medium' | 'high'
          application_link: string | null
          contact_name: string | null
          contact_email: string | null
          follow_up_date: string | null
        }
        Insert: {
          id?: string
          user_id: string
          company: string
          position: string
          location?: string | null
          job_type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'
          status: 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'accepted'
          deadline?: string | null
          salary?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          tags?: string[] | null
          priority?: 'low' | 'medium' | 'high'
          application_link?: string | null
          contact_name?: string | null
          contact_email?: string | null
          follow_up_date?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          company?: string
          position?: string
          location?: string | null
          job_type?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'
          status?: 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'accepted'
          deadline?: string | null
          salary?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          tags?: string[] | null
          priority?: 'low' | 'medium' | 'high'
          application_link?: string | null
          contact_name?: string | null
          contact_email?: string | null
          follow_up_date?: string | null
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          company: string
          application_link: string | null
          notes: string | null
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company: string
          application_link?: string | null
          notes?: string | null
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company?: string
          application_link?: string | null
          notes?: string | null
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      calendar_events: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          start_time: string
          end_time: string
          job_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          start_time: string
          end_time: string
          job_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          job_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      job_analytics: {
        Row: {
          user_id: string
          status: string
          count: number
          month: string
        }
      }
    }
  }
}