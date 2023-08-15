class PatientSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :first_name, :last_name, :guardian, :dob, :gender, :address, :email, :phone, :notes, :language_preferences, :allergies, :viewed_notice_of_privacy_practices
  
  has_many :users 
  has_many :appointments
end