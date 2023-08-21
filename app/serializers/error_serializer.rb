class ErrorSerializer < ActiveModel::Serializer
  def self.serialize(errors)
    errors.map{|key, value| "#{key} : #{value}"}
  end 
  
end

# OOP - how do you add a class method to an object? self 