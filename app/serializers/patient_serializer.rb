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
#
class PatientSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :first_name, :last_name, :guardian, :dob, :gender, :address, :email, :phone, :notes, :language_preferences, :allergies, :viewed_notice_of_privacy_practices

  attribute :unique_provider_emails
  
  has_many :users 
  has_many :appointments

  def dob
    self.object.dob.strftime('%m/%d/%Y')
  end 

  def unique_provider_emails
    self.object.appointments.joins(:user).pluck('users.email').uniq
  end
end


## EXAMPLE - self in a serializer:
  # def patient_test
  #   byebug 
  #   self # is not our actual instance, it's the instance of the serializer 
  #   self.object # then we get the actual object tied to our serializer.
  # end 

    # def unique_provider_emails
    #   self.object.appointments.joins(:user).pluck('users.email').uniq
    # end

    #self.object refers to patient object being serialized.
    #self.object.appointments => fetches all appointments associated with the patient. 
    #`.joins(:user)`: for each appointment, it fetches the corresponding user record. 
    #`.pluck('users.email')`: after joing with the user association, this part plucks the email attribute from the users table for each appointment. This results in an array of email addresses of the providers associated with the appointment. 
    #`.uniq`: this removes duplicate email addresses from the array. only unique email addresses are retained. 