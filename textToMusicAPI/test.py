from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy

class Helper:
    @staticmethod
    def process():
        print("hi")
        processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
        model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

        inputs = processor(
            text=["Candy pop ice cream", "EDM music in D major with tempo 200 bpm, and a I-IV-V-I chord progression"],
            padding=True,
            return_tensors="pt",
        )

        audio_values = model.generate(**inputs, do_sample=True, guidance_scale=3, max_new_tokens=256)

        sampling_rate = model.config.audio_encoder.sampling_rate
        scipy.io.wavfile.write("musicgen_out.wav", rate=sampling_rate, data=audio_values[0, 0].numpy())