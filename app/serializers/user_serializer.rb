class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email 
end

# The password_digest attribute is typically not serialized in a serializer for security reasons. The purpose of the password_digest attribute in a Rails application is to securely store the hashed version of the user's password using a cryptographic algorithm like bcrypt.

# When using a serializer to generate JSON output, it's important to avoid including sensitive information like passwords. Exposing the password_digest in the serialized JSON response could potentially pose a security risk if it falls into the wrong hands.

# Instead, it's common practice to exclude sensitive attributes like password_digest from the serializer's attribute list. By omitting the password_digest attribute from the serializer, you ensure that it won't be included in the JSON response when rendering the serialized user object.
