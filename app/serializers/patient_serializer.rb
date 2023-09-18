class PatientSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :first_name, :last_name, :guardian, :dob, :gender, :address, :email, :phone, :notes, :language_preferences, :allergies, :viewed_notice_of_privacy_practices
  attribute :unique_provider_emails
  
  # has_many :users 
  has_many :appointments

  def dob
    self.object.dob.strftime('%m/%d/%Y')
  end 

  def unique_provider_emails
    self.object.appointments.joins(:user).pluck('users.email').uniq
  end
end
