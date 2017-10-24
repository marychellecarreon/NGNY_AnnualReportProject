class Part < ApplicationRecord
  belongs_to :report
  has_many :sections, :dependent => :destroy
end
