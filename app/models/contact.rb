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


# ------------------------
# following validations are added:

# presence validation ensures that the attributes (first_name, last_name, dob, phone, email, and address) are not empty.
# format validation is used to ensure that the email attribute follows a valid email format using the URI::MailTo::EMAIL_REGEXP regular expression. This helps validate that the email provided is in a correct format.
# length validation sets a maximum length of 500 characters for the notes attribute. You can adjust this value based on your specific requirements.