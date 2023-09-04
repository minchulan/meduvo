class UserAppointmentsSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :category, :name, :location, :description, :date, :patient

  def patient
    {
      name: self.object.patient.full_name,
      dob: self.object.patient.dob.strftime('%m/%d/%Y'),
    }
  end 

  def date 
    self.object.date.strftime('%m-%d-%Y')
  end 
end

# This class UserAppointmentSerializer inherits from ActiveModel::Serializer, which is a base class provided by AMS for defining how to serialize data.

# self.object.patient is used to access the associated Patient model from the UserAppointment being serialized, and you can access attributes or methods of the Patient model from there.

# The attributes method specifies which attributes or fields from the model should be included in the serialized output. In this case, it includes :id, :patient_id, :category, :name, :location, :description, :date, and :patient.

# to invoke methods, must add to the list of attributes in line 2. 

# If you want to change or customize an attribute, you can do so by writing the attributes name and write your own method to overwrite it! 

# custom attribute :patient is defined. This attribute is not a direct attribute of the UserAppointment model but is constructed by the serializer.
  # Inside the patient method, a hash is constructed. It includes two key-value pairs: name and dob. These represent the patient's name and date of birth.

# self.object.patient.full_name retrieves the patient's full name (a method or attribute defined in the Patient model).

# using self.object.patient to access the associated patient of the UserAppointment object being serialized.

# self is explicitly written out to know that we are accessing the object (or instance)

# (byebug) self
#<UserAppointmentsSerializer:0x000000013aa89e28 @object=#<Appointment id: 340, user_id: 194, patient_id: 296, category: "immunization", name: "culpa necessitatibus iste eius", location: "Suite 170 4365 Russel Haven, Garfieldville, IA 363...", description: "Nostrum molestias vel. Veniam optio quaerat. Aliqu...", created_at: "2023-09-02 01:31:11.972190000 +0000", updated_at: "2023-09-02 01:31:11.972190000 +0000", date: "2023-09-08">, @instance_options={:status=>200, :namespace=>nil, :scope=>#<User id: 194, username: "admin", email: "admin@example.com", password_digest: [FILTERED], created_at: "2023-09-02 01:31:11.943755000 +0000", updated_at: "2023-09-02 01:31:11.943755000 +0000", admin: true>, :scope_name=>:current_user, :serializer_context_class=>UserSerializer}, @root=nil, @scope=#<User id: 194, username: "admin", email: "admin@example.com", password_digest: [FILTERED], created_at: "2023-09-02 01:31:11.943755000 +0000", updated_at: "2023-09-02 01:31:11.943755000 +0000", admin: true>, @instance_reflections={}, @attributes=nil>

# (byebug) self.object
#<Appointment id: 340, user_id: 194, patient_id: 296, category: "immunization", name: "culpa necessitatibus iste eius", location: "Suite 170 4365 Russel Haven, Garfieldville, IA 363...", description: "Nostrum molestias vel. Veniam optio quaerat. Aliqu...", created_at: "2023-09-02 01:31:11.972190000 +0000", updated_at: "2023-09-02 01:31:11.972190000 +0000", date: "2023-09-08">
