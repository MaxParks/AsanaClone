def normalize_objects(objects):
    normalized_data = {}
    for index, obj in enumerate(objects):
        normalized_data[index + 1] = obj.to_dict()
    return normalized_data
