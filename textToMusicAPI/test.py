from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy

class Helper:
    @staticmethod
    def process(inputList):
        print("hi")
        processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
        model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

        inputs = processor(
            text=inputList,
            padding=True,
            return_tensors="pt",
        )

        audio_values = model.generate(**inputs, do_sample=True, guidance_scale=3, max_new_tokens=256)

        sampling_rate = model.config.audio_encoder.sampling_rate
        scipy.io.wavfile.write("musicgen_out.wav", rate=sampling_rate, data=audio_values[0, 0].numpy())