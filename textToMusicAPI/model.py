from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy

class Helper:
    @staticmethod
    def process(inputList, seconds, cfg):
        print("hi", inputList, seconds, cfg)
        processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
        model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

        inputs = processor(
            text=inputList,
            padding=True,
            return_tensors="pt",
        )

        audio_values = model.generate(**inputs, do_sample=True, guidance_scale=cfg, max_new_tokens=int(256/5*seconds))

        sampling_rate = model.config.audio_encoder.sampling_rate
        scipy.io.wavfile.write("musicgen_out.wav", rate=sampling_rate, data=audio_values[0, 0].numpy())