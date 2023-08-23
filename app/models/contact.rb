# == Schema Information
#
# Table name: contacts
#
#  id         :bigint           not null, primary key
#  address    :text
#  dob        :date
#  email      :string
#  first_name :string
#  last_name  :string
#  notes      :text
#  phone      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Contact < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :dob, presence: true
  validates :phone, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :address, presence: true
  validates :notes, length: { maximum: 500 }
end
