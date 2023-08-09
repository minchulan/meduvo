# == Schema Information
#
# Table name: patients
#
#  id                                 :bigint           not null, primary key
#  address                            :string
#  allergies                          :string
#  dob                                :date
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
#  user_id                            :bigint           not null
#
# Indexes
#
#  index_patients_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Patient < ApplicationRecord
    belongs_to :user 
    has_many :appointments, dependent: :destroy 
    # has_many :users, through: :appointments

    validates :first_name, :last_name, :dob, :allergies, :phone, :email, presence: true

    def full_name
        "#{first_name} #{last_name}"
    end 

    scope :sort_desc_by_name, -> { order(name: :desc) }

end 

# By using the full_name method, you can conveniently display the full name attribute without modifying the existing first_name and last_name attributes.
