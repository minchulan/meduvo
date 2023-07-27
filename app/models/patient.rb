# == Schema Information
#
# Table name: patients
#
#  id                                 :bigint           not null, primary key
#  address                            :string
#  allergies                          :string
#  dob                                :string
#  email                              :string
#  first_name                         :string
#  gender                             :string
#  guardian                           :string
#  language_preferences               :string
#  last_name                          :string
#  notes                              :text
#  phone                              :string
#  viewed_notice_of_privacy_practices :string
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#
class Patient < ApplicationRecord
    has_many :appointments, dependent: :destroy 
    has_many :users, through: :appointments

    validates :first_name, :last_name, :dob, :phone, :email, presence: true
    # validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :email, presence: true

    def full_name
        "#{first_name} #{last_name}"
    end 
end 

# By using the full_name method, you can conveniently display the full name attribute without modifying the existing first_name and last_name attributes.
