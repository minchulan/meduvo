# == Schema Information
#
# Table name: appointments
#
#  id          :bigint           not null, primary key
#  category    :string
#  date        :date
#  description :text
#  location    :string
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  patient_id  :integer
#  user_id     :integer
#
class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :patient_id, :category, :name, :location, :description, :created_at, :date 
  
  belongs_to :user
  belongs_to :patient
end
          
# Serializers in Rails are typically run during the rendering of a response. When you call `render` in your controller action, Rails automatically determines the appropriate serializer based on the object you're rendering and applies it.

# Serializers are responsible for converting the Ruby objects into a JSON or XML representation that can be sent as a response. They define which attributes and associations of the object should be included in the serialized output.

# Here's a general overview of the steps involved in the serialization process:

# 1. The controller action is executed, and it prepares the data to be rendered.
# 2. The `render` method is called, specifying the object or collection to be serialized.
# 3. Rails determines the appropriate serializer based on the object's class and the serializer's naming convention.
# 4. The serializer is instantiated and passed the object or collection to be serialized.
# 5. The serializer accesses the object's attributes and associations, applying any defined transformations or modifications.
# 6. The serializer generates a JSON or XML representation of the object, including the specified attributes and associations.
# 7. The serialized output is included in the response, and the response is sent back to the client.

# In summary, the serializer is run automatically by Rails during the rendering process when you use `render` with an object or collection that requires serialization.

# It looks like you've defined an `AppointmentSerializer` class using Active Model Serializer to control how your appointment data is serialized and sent to the frontend. This serializer specifies the attributes that will be included in the serialized JSON response for appointments.

# The attributes you've included in your serializer (`id`, `user_id`, `patient_id`, `category`, `name`, `location`, `description`, `created_at`, `updated_at`) match the attributes of your `Appointment` model. This means that when you retrieve appointment data using this serializer, the JSON response will include these attributes for each appointment.

# Here's a breakdown of your `AppointmentSerializer`:

# ```ruby
# class AppointmentSerializer < ActiveModel::Serializer
#   attributes :id, :user_id, :patient_id, :category, :name, :location, :description, :created_at, :updated_at

#   belongs_to :user
#   belongs_to :patient
# end
# ```

# - `attributes`: This is where you list the attributes of your `Appointment` model that you want to include in the serialized JSON. These attributes will be part of the JSON response when you fetch appointments.

# - `belongs_to`: These associations specify that each appointment belongs to a `user` and a `patient`. When the JSON response is generated, these associations will be nested within the appointment data. This allows you to access associated user and patient data when retrieving appointment details.

# When you fetch appointments from your backend using this serializer, the resulting JSON response will follow this structure, including the listed attributes and nested associations.

# For example:

# ```json
# {
#   "id": 1,
#   "user_id": 123,
#   "patient_id": 456,
#   "category": "checkup",
#   "name": "Routine Checkup",
#   "location": "Medical Center",
#   "description": "Regular health check",
#   "created_at": "2023-08-04T15:00:00Z",
#   "updated_at": "2023-08-04T15:30:00Z",
#   "user": {
#     // User data here...
#   },
#   "patient": {
#     // Patient data here...
#   }
# }
# ```

# This structure allows your frontend to easily access and display appointment data along with its associated user and patient information.
