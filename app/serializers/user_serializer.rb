# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean
#  email           :string
#  password_digest :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :admin, :created_at, :updated_at
  has_many :patients
  has_many :appointments
end

# The password_digest attribute is typically not serialized in a serializer for security reasons. The purpose of the password_digest attribute in a Rails application is to securely store the hashed version of the user's password using a cryptographic algorithm like bcrypt.

# When using a serializer to generate JSON output, it's important to avoid including sensitive information like passwords. Exposing the password_digest in the serialized JSON response could potentially pose a security risk if it falls into the wrong hands.

# Instead, it's common practice to exclude sensitive attributes like password_digest from the serializer's attribute list. By omitting the password_digest attribute from the serializer, you ensure that it won't be included in the JSON response when rendering the serialized user object.

#--------------------------------------------

# The provided code is an example of a serializer class in Ruby on Rails using Active Model Serializer. Serializers in Rails are used to control the representation of objects when converting them to JSON or XML format.

# In this specific code snippet:

# 1. The `UserSerializer` class is defined, and it inherits from `ActiveModel::Serializer`. This means that `UserSerializer` will have access to the functionality provided by `ActiveModel::Serializer`.

# 2. The `attributes` method is called within the class, specifying the attributes that should be serialized. In this case, the `:id` and `:email` attributes of the user object will be included in the serialized output.

# The purpose of this serializer is to define how a `User` object should be serialized when it needs to be converted to JSON or XML format. By specifying the attributes to include, you can control which data is exposed and returned in the serialized representation of the user object.

# For example, if you have a `User` object with an `id` of 1 and an `email` of "user@example.com", when you serialize this object using `UserSerializer`, the resulting JSON or XML output might look like:

# ```json
# {
#   "user": {
#     "id": 1,
#     "email": "user@example.com"
#   }
# }
# ```

# The serializer helps provide a consistent and controlled structure for the data returned by your API endpoints. It allows you to specify which attributes to include, exclude, or modify as needed, providing flexibility in shaping the response to match the desired API contract or client requirements.
