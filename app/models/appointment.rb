# == Schema Information
#
# Table name: appointments
#
#  id          :bigint           not null, primary key
#  category    :string
#  date        :date
#  description :text
#  location    :string
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  patient_id  :integer
#  user_id     :integer
#
class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :patient 

  validates :name, :category, :description, :date, :location, presence: true
  validates :description, length: {in: 5...100}

  # default_scope { order(date: :asc) } # Default ordering by date in ascending order
end

#With this default scope, every time you query the Appointment model, the records will be fetched in ascending order based on the date attribute. 
