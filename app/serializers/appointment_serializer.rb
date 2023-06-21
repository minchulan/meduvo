class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :patient_id, :category, :name, :location, :description 
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