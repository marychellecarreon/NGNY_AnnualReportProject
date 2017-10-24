class AddDefaultValueToContentAttribute < ActiveRecord::Migration[5.0]
  def change
    change_column :sections, :content, :text, default: 'Example text currently showing. Edit this and input your information'
  end
end
