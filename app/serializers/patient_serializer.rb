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
  attributes :id, :full_name, :first_name, :last_name, :guardian, :gender, :dob, :address, :email, :phone, :notes, :language_preferences, :allergies, :viewed_notice_of_privacy_practices
  
  has_many :users 
  has_many :appointments
end


# The object refers to the instance of the Patient model that is being serialized. When the serializer is invoked, it will have access to an instance of the model, and object represents that instance.

# Inside the full_name method, object is used to access the attributes of the Patient instance. In this case, it retrieves the first_name and last_name attributes of the Patient instance and concatenates them to form the full name.

# By using object, you can access the attributes and associations of the model instance being serialized within the serializer. In this case, object represents the Patient instance, and you can access its attributes (first_name and last_name) using object.first_name and object.last_name.

# This allows you to customize the serialization logic and include derived attributes or perform additional transformations based on the attributes of the model instance being serialized. In this case, it creates a full_name attribute by combining the first_name and last_name attributes.

# Note that object is a reserved keyword in the Active Model Serializers gem, and it is automatically set to the model instance being serialized within the serializer context.





