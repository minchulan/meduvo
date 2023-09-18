class Contact < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :dob, presence: true
  validates :phone, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :address, presence: true
  validates :notes, length: { maximum: 500 }
end
