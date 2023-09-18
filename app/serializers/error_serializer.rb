class ErrorSerializer < ActiveModel::Serializer
  def self.serialize(errors)
    errors.map{|key, value| "#{key} : #{value}"}
  end 
end
